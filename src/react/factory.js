/* AxonCore React components — framework-light factory.
 * Plain JS (React.createElement, no JSX, no build step) so the same source
 * powers the npm package (dist/react/index.mjs) and the Claude Design bundle
 * (window.AxonCore). Styling lives in components.css (.ax-* classes). */

function createAxonCore(React) {
  var h = React.createElement;
  var LOGO = __LOGO_DATA__;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(" ");
  }
  function omit(props, keys) {
    var o = {};
    for (var k in props) if (Object.prototype.hasOwnProperty.call(props, k) && keys.indexOf(k) < 0) o[k] = props[k];
    return o;
  }
  var uid = 0;
  function useStableId(prefix) {
    if (React.useId) return prefix + React.useId().replace(/:/g, "");
    var ref = React.useRef(null);
    if (ref.current === null) ref.current = prefix + ++uid;
    return ref.current;
  }

  /* Logo ------------------------------------------------------------------ */
  function Logo(props) {
    var lockup = props.lockup || "horizontal";
    var tone = props.tone || "color";
    var height = props.height || (lockup === "isotype" ? 32 : 40);
    var data = LOGO[lockup] || LOGO.horizontal;
    var gid = useStableId("ax-signal-");
    var iconFill = tone === "color" ? "url(#" + gid + ")" : "currentColor";
    var rest = omit(props, ["lockup", "tone", "height", "className", "title"]);
    var defs = tone === "color"
      ? h("defs", null, h("linearGradient", { id: gid, gradientUnits: "userSpaceOnUse", x1: data.gx1, y1: 0, x2: data.gx2, y2: 0 },
          h("stop", { offset: 0, stopColor: "#FC1C70" }),
          h("stop", { offset: 0.5, stopColor: "#C04AE1" }),
          h("stop", { offset: 1, stopColor: "#0082FB" })))
      : null;
    return h("span", Object.assign({ className: cx("ax-logo", props.className), style: { height: height } }, rest),
      h("svg", { viewBox: data.viewBox, role: "img", "aria-label": props.title || "AxonCore", xmlns: "http://www.w3.org/2000/svg" },
        defs,
        h("path", { d: data.icon, fill: iconFill, fillRule: "evenodd" }),
        data.wordmark ? h("path", { d: data.wordmark, fill: "currentColor", fillRule: "evenodd" }) : null));
  }

  /* Button ---------------------------------------------------------------- */
  function Button(props) {
    var variant = props.variant || "secondary";
    var size = props.size || "md";
    var loading = !!props.loading;
    var Tag = props.href ? "a" : "button";
    var rest = omit(props, ["variant", "size", "loading", "iconStart", "iconEnd", "iconOnly", "block", "className", "children"]);
    if (Tag === "button" && !rest.type) rest.type = "button";
    if (loading) { rest["aria-busy"] = true; rest["data-loading"] = "true"; if (Tag === "button") rest.disabled = true; }
    return h(Tag, Object.assign({
      className: cx("ax-btn", "ax-btn--" + variant, size !== "md" && "ax-btn--" + size, props.iconOnly && "ax-btn--icon", props.block && "ax-btn--block", props.className)
    }, rest),
      loading ? h("span", { className: "ax-spinner", "aria-hidden": true }) : props.iconStart || null,
      props.iconOnly ? null : h("span", { className: "ax-btn__label" }, props.children),
      props.iconOnly && !loading ? props.children : null,
      !loading && props.iconEnd ? props.iconEnd : null);
  }

  /* TextField ------------------------------------------------------------- */
  function TextField(props) {
    var autoId = useStableId("ax-field-");
    var id = props.id || autoId;
    var hintId = id + "-hint";
    var describedBy = props.error || props.hint ? hintId : undefined;
    var rest = omit(props, ["label", "hint", "error", "multiline", "className", "id"]);
    var control = h(props.multiline ? "textarea" : "input", Object.assign({
      id: id, className: "ax-input", "aria-invalid": props.error ? true : undefined, "aria-describedby": describedBy
    }, rest));
    return h("div", { className: cx("ax-field", props.className) },
      props.label ? h("label", { className: "ax-field__label", htmlFor: id }, props.label) : null,
      control,
      props.error ? h("span", { id: hintId, className: "ax-field__error" }, props.error)
        : props.hint ? h("span", { id: hintId, className: "ax-field__hint" }, props.hint) : null);
  }

  /* Checkbox -------------------------------------------------------------- */
  function Checkbox(props) {
    var rest = omit(props, ["label", "className"]);
    return h("label", { className: cx("ax-choice", props.className) },
      h("input", Object.assign({ type: "checkbox", className: "ax-check" }, rest)),
      props.label ? h("span", null, props.label) : null);
  }

  /* Switch ---------------------------------------------------------------- */
  function Switch(props) {
    var controlled = props.checked !== undefined;
    var st = React.useState(!!props.defaultChecked);
    var on = controlled ? !!props.checked : st[0];
    var id = useStableId("ax-switch-");
    function toggle() {
      if (props.disabled) return;
      if (!controlled) st[1](!on);
      if (props.onChange) props.onChange(!on);
    }
    var btn = h("button", {
      type: "button", role: "switch", id: id, className: "ax-switch", "aria-checked": on,
      disabled: props.disabled, onClick: toggle, "aria-label": props.label ? undefined : props["aria-label"]
    });
    if (!props.label) return btn;
    return h("span", { className: cx("ax-choice", props.className), style: { alignItems: "center" } },
      btn, h("label", { htmlFor: id, style: { cursor: "inherit" } }, props.label));
  }

  /* Badge ----------------------------------------------------------------- */
  function Badge(props) {
    var tone = props.tone || "neutral";
    return h("span", { className: cx("ax-badge", tone !== "neutral" && "ax-badge--" + tone, props.live && "ax-badge--live", props.className) },
      props.dot || props.live ? h("span", { className: "ax-badge__dot", "aria-hidden": true }) : null,
      props.children);
  }

  /* Card ------------------------------------------------------------------ */
  function Card(props) {
    var variant = props.variant || "default";
    var Tag = props.as || (props.href ? "a" : "div");
    var rest = omit(props, ["variant", "title", "description", "eyebrow", "className", "children", "as", "interactive"]);
    return h(Tag, Object.assign({
      className: cx("ax-card", variant !== "default" && "ax-card--" + variant, (props.interactive || props.href) && "ax-card--interactive", props.className)
    }, rest),
      props.eyebrow ? h("span", { className: "ax-eyebrow" }, props.eyebrow) : null,
      props.title ? h("h3", { className: "ax-card__title" }, props.title) : null,
      props.description ? h("p", { className: "ax-card__body" }, props.description) : null,
      props.children);
  }

  /* Tabs ------------------------------------------------------------------ */
  function Tabs(props) {
    var items = props.items || [];
    var controlled = props.value !== undefined;
    var st = React.useState(props.defaultValue || (items[0] && items[0].value));
    var value = controlled ? props.value : st[0];
    function select(v) { if (!controlled) st[1](v); if (props.onChange) props.onChange(v); }
    function onKey(e) {
      var i = items.findIndex(function (t) { return t.value === value; });
      var next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
      if (next === null) return;
      next = (next + items.length) % items.length;
      select(items[next].value);
      var btns = e.currentTarget.querySelectorAll('[role="tab"]');
      if (btns[next]) btns[next].focus();
    }
    return h("div", { role: "tablist", className: cx("ax-tabs", props.className), onKeyDown: onKey, "aria-label": props["aria-label"] },
      items.map(function (t) {
        var sel = t.value === value;
        return h("button", { key: t.value, type: "button", role: "tab", className: "ax-tab", "aria-selected": sel, tabIndex: sel ? 0 : -1, onClick: function () { select(t.value); } }, t.label);
      }));
  }

  /* Alert ----------------------------------------------------------------- */
  var ICONS = {
    info: "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM9.1 9.5h1.8v5H9.1z",
    success: "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1.2 11.2L5.6 10l1.3-1.3 1.9 1.9 4.3-4.3 1.3 1.3z",
    warning: "M10 2.2 1.6 17h16.8L10 2.2Zm-.9 5h1.8v4.9H9.1zm.9 6.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
    danger: "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.2 10-1.2 1.2-2-2-2 2L6.8 12l2-2-2-2L8 6.8l2 2 2-2L13.2 8l-2 2z",
    ai: "M10 1.5 11.9 8.1 18.5 10l-6.6 1.9L10 18.5l-1.9-6.6L1.5 10l6.6-1.9z"
  };
  function Alert(props) {
    var tone = props.tone || "info";
    return h("div", { role: tone === "danger" ? "alert" : "status", className: cx("ax-alert", "ax-alert--" + tone, props.className) },
      h("svg", { className: "ax-alert__icon", viewBox: "0 0 20 20", "aria-hidden": true }, h("path", { d: ICONS[tone] || ICONS.info, fill: "currentColor", fillRule: "evenodd" })),
      props.title ? h("p", { className: "ax-alert__title" }, props.title) : null,
      props.children ? h("p", { className: "ax-alert__body" }, props.children) : null);
  }

  /* Stat ------------------------------------------------------------------ */
  function Stat(props) {
    var trend = props.trend;
    return h("div", { className: cx("ax-stat", props.size === "lg" && "ax-stat--lg", props.className) },
      h("span", { className: "ax-eyebrow" }, props.label),
      h("span", { className: "ax-stat__value" }, props.value),
      props.delta || props.caption ? h("span", { className: "ax-stat__meta" },
        props.delta ? h(Badge, { tone: trend === "down" ? "danger" : trend === "flat" ? "neutral" : "success" }, (trend === "down" ? "▼ " : trend === "flat" ? "" : "▲ ") + props.delta) : null,
        props.caption || null) : null);
  }

  /* Table ----------------------------------------------------------------- */
  function Table(props) {
    var cols = props.columns || [];
    var rows = props.rows || [];
    return h("div", { className: cx("ax-table-wrap", props.className) },
      h("table", { className: "ax-table" },
        props.caption ? h("caption", { style: { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" } }, props.caption) : null,
        h("thead", null, h("tr", null, cols.map(function (c) { return h("th", { key: c.key, className: c.numeric ? "is-num" : undefined, scope: "col" }, c.label); }))),
        h("tbody", null, rows.map(function (r, i) {
          return h("tr", { key: r.id || i }, cols.map(function (c) {
            return h("td", { key: c.key, className: c.numeric ? "is-num" : undefined }, c.render ? c.render(r) : r[c.key]);
          }));
        }))));
  }

  /* SignalLine ------------------------------------------------------------ */
  function SignalLine(props) {
    return h("hr", { className: cx("ax-signal-line", props.weight === 2 && "ax-signal-line--2", props.live && "ax-signal-line--live", props.className), "aria-hidden": true });
  }

  return { Logo: Logo, Button: Button, TextField: TextField, Checkbox: Checkbox, Switch: Switch, Badge: Badge, Card: Card, Tabs: Tabs, Alert: Alert, Stat: Stat, Table: Table, SignalLine: SignalLine };
}
