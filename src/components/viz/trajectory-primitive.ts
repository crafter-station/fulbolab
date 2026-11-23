import {
  type ChangeDetails,
  createChange,
  createRovingFocus,
  createSelection,
  definePrimitive,
} from "@ui-sdk/core";

type TrajectoryReason = "item-press" | "list-navigation" | "scrub";

export type TrajectoryOptions = {
  team?: string[];
  defaultTeam?: string[];
  onTeamChange?: (
    value: string[],
    details: ChangeDetails<TrajectoryReason>,
  ) => void;
  checkpoint?: string[];
  defaultCheckpoint?: string[];
  onCheckpointChange?: (
    value: string[],
    details: ChangeDetails<TrajectoryReason>,
  ) => void;
};

export const trajectoryPrimitive = definePrimitive({
  name: "trajectory-scrubber",
  options: {
    team: "list",
    defaultTeam: "list",
    onTeamChange: "callback",
    checkpoint: "list",
    defaultCheckpoint: "list",
    onCheckpointChange: "callback",
  },
  controlled: ["team", "checkpoint"],
  state: (options: TrajectoryOptions) => ({
    team: options.team ?? options.defaultTeam ?? [],
    checkpoint: options.checkpoint ?? options.defaultCheckpoint ?? [],
    focusedTeam: null as string | null,
    focusedCheckpoint: null as string | null,
  }),
  sync: (options) => ({
    ...(options.team === undefined ? {} : { team: options.team }),
    ...(options.checkpoint === undefined
      ? {}
      : { checkpoint: options.checkpoint }),
  }),
  api: (context) => {
    const change = createChange(context);

    const teamFocus = createRovingFocus(context, {
      slot: "team",
      key: "focusedTeam",
      remember: false,
      orientation: () => "both",
      loop: () => true,
      preferred: (item) => context.store.get().team.includes(item.key),
      claims: (state, item) =>
        state.team.length === 0 || state.team.includes(item.key),
    });

    const checkpointFocus = createRovingFocus(context, {
      slot: "checkpoint",
      key: "focusedCheckpoint",
      remember: false,
      orientation: () => "horizontal",
      preferred: (item) => context.store.get().checkpoint.includes(item.key),
      claims: (state, item) =>
        state.checkpoint.length === 0 || state.checkpoint.includes(item.key),
    });

    const teams = createSelection(context, {
      key: "team",
      set: (value, details) => change("team", value, details),
      order: () => teamFocus.items().map((item) => item.key),
    });

    const checkpoints = createSelection(context, {
      key: "checkpoint",
      set: (value, details) => change("checkpoint", value, details),
      order: () => checkpointFocus.items().map((item) => item.key),
    });

    return {
      teamFocus,
      checkpointFocus,
      teams,
      checkpoints,
      pickTeam(key: string, event?: Event) {
        teams.choose(key, { reason: "item-press", event });
      },
      pickCheckpoint(key: string, event?: Event) {
        checkpoints.choose(key, { reason: "item-press", event });
      },
      scrub(key: string, event?: Event) {
        if (!checkpoints.isSelected(key)) {
          checkpoints.choose(key, { reason: "scrub", event });
        }
      },
      teamKeydown(event: KeyboardEvent, el: HTMLElement) {
        const moved = teamFocus.keydown(event, el);
        if (moved) {
          teams.choose(moved.key, { reason: "list-navigation", event });
        }
      },
      checkpointKeydown(event: KeyboardEvent, el: HTMLElement) {
        const moved = checkpointFocus.keydown(event, el);
        if (moved) {
          checkpoints.choose(moved.key, { reason: "list-navigation", event });
        }
      },
    };
  },
  slots: (slot) => ({
    root: slot<object, { team: string | null; checkpoint: string | null }>({
      role: "group",
      state: (state) => ({
        team: state.team[0] ?? null,
        checkpoint: state.checkpoint[0] ?? null,
      }),
    }),
    teams: slot({
      role: "radiogroup",
      keys: { none: "Cada equipo maneja sus flechas con roving focus." },
    }),
    team: slot<{ value: string }, { selected: boolean }>({
      props: { value: "string" },
      role: "radio",
      focus: "roving",
      state: (state, part) => ({ selected: state.team.includes(part.key) }),
      attrs: (state, part) => ({
        type: "button",
        "aria-checked": String(state.team.includes(part.key)),
        tabindex: part.api.teamFocus.tabIndex(state, part),
        "data-selected": state.team.includes(part.key) ? "" : undefined,
      }),
      press: ({ api, key }, event) => api.pickTeam(key, event),
      on: {
        keydown: (event, { el, api }) => {
          if (el) api.teamKeydown(event as KeyboardEvent, el);
        },
      },
      bind: (el, part) => part.api.teamFocus.bind(el, part),
    }),
    checkpoints: slot({
      role: "radiogroup",
      keys: { none: "Cada punto de control maneja sus flechas." },
    }),
    checkpoint: slot<{ value: string }, { selected: boolean }>({
      props: { value: "string" },
      role: "radio",
      focus: "roving",
      state: (state, part) => ({
        selected: state.checkpoint.includes(part.key),
      }),
      attrs: (state, part) => ({
        type: "button",
        "aria-checked": String(state.checkpoint.includes(part.key)),
        tabindex: part.api.checkpointFocus.tabIndex(state, part),
        "data-selected": state.checkpoint.includes(part.key) ? "" : undefined,
      }),
      press: ({ api, key }, event) => api.pickCheckpoint(key, event),
      on: {
        keydown: (event, { el, api }) => {
          if (el) api.checkpointKeydown(event as KeyboardEvent, el);
        },
        pointerenter: (event, { api, key }) => api.scrub(key, event),
      },
      bind: (el, part) => part.api.checkpointFocus.bind(el, part),
    }),
  }),
});
