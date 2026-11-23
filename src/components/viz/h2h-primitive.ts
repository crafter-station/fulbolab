import {
  type ChangeDetails,
  createChange,
  createRovingFocus,
  createSelection,
  definePrimitive,
} from "@ui-sdk/core";

type H2HReason = "item-press" | "list-navigation";

export type H2HOptions = {
  selected?: string[];
  defaultSelected?: string[];
  onSelectedChange?: (
    value: string[],
    details: ChangeDetails<H2HReason>,
  ) => void;
};

export const h2hPrimitive = definePrimitive({
  name: "h2h-triangle",
  options: {
    selected: "list",
    defaultSelected: "list",
    onSelectedChange: "callback",
  },
  controlled: ["selected"],
  state: (options: H2HOptions) => ({
    selected: options.selected ?? options.defaultSelected ?? [],
    focused: null as string | null,
  }),
  sync: (options) =>
    options.selected === undefined ? {} : { selected: options.selected },
  api: (context) => {
    const change = createChange(context);
    const roving = createRovingFocus(context, {
      slot: "node",
      key: "focused",
      remember: false,
      orientation: () => "both",
      loop: () => true,
      preferred: (item) => context.store.get().selected.includes(item.key),
      claims: (state, item) =>
        state.selected.length === 0 || state.selected.includes(item.key),
    });
    const selection = createSelection(context, {
      key: "selected",
      set: (value, details) => change("selected", value, details),
      order: () => roving.items().map((item) => item.key),
    });

    return {
      roving,
      selection,
      inspect(key: string, event?: Event) {
        selection.choose(key, { reason: "item-press", event });
      },
      keydown(event: KeyboardEvent, el: HTMLElement) {
        const moved = roving.keydown(event, el);
        if (moved) {
          selection.choose(moved.key, { reason: "list-navigation", event });
        }
      },
    };
  },
  slots: (slot) => ({
    root: slot<object, { selected: string | null }>({
      role: "group",
      state: (state) => ({ selected: state.selected[0] ?? null }),
    }),
    nodes: slot({
      role: "radiogroup",
      keys: { none: "Cada vértice y arista maneja sus flechas en anillo." },
    }),
    node: slot<{ value: string }, { selected: boolean }>({
      props: { value: "string" },
      role: "radio",
      focus: "roving",
      state: (state, part) => ({ selected: state.selected.includes(part.key) }),
      attrs: (state, part) => ({
        type: "button",
        "aria-checked": String(state.selected.includes(part.key)),
        tabindex: part.api.roving.tabIndex(state, part),
        "data-selected": state.selected.includes(part.key) ? "" : undefined,
        "data-kind": part.key.startsWith("edge:") ? "edge" : "team",
      }),
      press: ({ api, key }, event) => api.inspect(key, event),
      on: {
        keydown: (event, { el, api }) => {
          if (el) api.keydown(event as KeyboardEvent, el);
        },
      },
      bind: (el, part) => part.api.roving.bind(el, part),
    }),
  }),
});
