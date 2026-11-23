import {
  type ChangeDetails,
  createChange,
  createRovingFocus,
  createSelection,
  definePrimitive,
} from "@ui-sdk/core";

type BracketReason = "item-press" | "list-navigation" | "clear";

export type BracketOptions = {
  winner?: string[];
  defaultWinner?: string[];
  onWinnerChange?: (
    value: string[],
    details: ChangeDetails<BracketReason>,
  ) => void;
};

export const bracketPrimitive = definePrimitive({
  name: "bracket-simulator",
  options: {
    winner: "list",
    defaultWinner: "list",
    onWinnerChange: "callback",
  },
  controlled: ["winner"],
  state: (options: BracketOptions) => ({
    winner: options.winner ?? options.defaultWinner ?? [],
    focused: null as string | null,
  }),
  sync: (options) =>
    options.winner === undefined ? {} : { winner: options.winner },
  api: (context) => {
    const change = createChange(context);
    const roving = createRovingFocus(context, {
      slot: "entrant",
      key: "focused",
      remember: false,
      orientation: () => "both",
      loop: () => true,
      preferred: (item) => context.store.get().winner.includes(item.key),
      claims: (state, item) =>
        state.winner.length === 0 || state.winner.includes(item.key),
    });
    const selection = createSelection(context, {
      key: "winner",
      set: (value, details) => change("winner", value, details),
      order: () => roving.items().map((item) => item.key),
    });

    return {
      roving,
      selection,
      advance(key: string, event?: Event) {
        selection.choose(key, { reason: "item-press", event });
      },
      clear(event?: Event) {
        change("winner", [], { reason: "clear", event });
      },
      keydown(event: KeyboardEvent, el: HTMLElement) {
        if (event.key === "Escape" || event.key === "Backspace") {
          event.preventDefault();
          change("winner", [], { reason: "clear", event });
          return;
        }
        const moved = roving.keydown(event, el);
        if (moved) {
          selection.choose(moved.key, { reason: "list-navigation", event });
        }
      },
    };
  },
  slots: (slot) => ({
    root: slot<object, { winner: string | null }>({
      role: "group",
      state: (state) => ({ winner: state.winner[0] ?? null }),
      attrs: (state) => ({
        "data-decided": state.winner.length > 0 ? "" : undefined,
      }),
    }),
    entrants: slot({
      role: "radiogroup",
      keys: { none: "Cada finalista maneja sus flechas con roving focus." },
    }),
    entrant: slot<
      { value: string },
      { selected: boolean; eliminated: boolean }
    >({
      props: { value: "string" },
      role: "radio",
      focus: "roving",
      state: (state, part) => ({
        selected: state.winner.includes(part.key),
        eliminated: state.winner.length > 0 && !state.winner.includes(part.key),
      }),
      attrs: (state, part) => ({
        type: "button",
        "aria-checked": String(state.winner.includes(part.key)),
        tabindex: part.api.roving.tabIndex(state, part),
        "data-selected": state.winner.includes(part.key) ? "" : undefined,
        "data-eliminated":
          state.winner.length > 0 && !state.winner.includes(part.key)
            ? ""
            : undefined,
      }),
      press: ({ api, key }, event) => api.advance(key, event),
      on: {
        keydown: (event, { el, api }) => {
          if (el) api.keydown(event as KeyboardEvent, el);
        },
      },
      bind: (el, part) => part.api.roving.bind(el, part),
    }),
    reset: slot({
      role: "button",
      focus: "native",
      present: (state) => state.winner.length > 0,
      attrs: () => ({ type: "button" }),
      press: ({ api }, event) => api.clear(event),
    }),
  }),
});
