import { capitalize, weightDescription } from "utils/text";

export const DEFAULT_SECTIONS = {
  typography: {
    title: "Typography",
    props: ["fontSize", "fontWeight", "textAlign"],
    summary: ({ fontSize, fontWeight, textAlign }: any) => {
      return `${fontSize || ""}, ${weightDescription(fontWeight)}, ${capitalize(
        textAlign
      )}`;
    },
    items: ["fontSize", "textAlign", "fontWeight"],
  },
  margin: {
    title: "Margin",
    props: ["margin"],
    summary: ({ margin }: any) => {
      return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
        margin[3] || 0
      }px`;
    },
    items: [
      {
        propKey: "margin",
        index: 0,
      },
      {
        propKey: "margin",
        index: 1,
      },
      {
        propKey: "margin",
        index: 2,
      },
      {
        propKey: "margin",
        index: 3,
      },
    ],
  },
  colors: {
    title: "Colors",
    props: ["background", "color"],
    summary: ({ background, color }: any) => {
      return (
        <div className="flex flex-row-reverse">
          <div
            style={{
              background: background && `rgba(${Object.values(background)})`,
            }}
            className="shadow-md flex-end w-6 h-6 text-center flex items-center rounded-full bg-dark"
          >
            <p
              style={{
                color: color && `rgba(${Object.values(color)})`,
              }}
              className="text-white w-full text-center"
            >
              T
            </p>
          </div>
        </div>
      );
    },
    items: ["background", "color"],
  },
  dimensions: {
    title: "Dimensions",
    props: ["width", "height"],
    summary: ({ width, height }: any) => {
      return `${width || 0} x ${height || 0}`;
    },
    items: ["width", "height"],
  },
  padding: {
    title: "Padding",
    props: ["padding"],
    summary: ({ padding }: any) => {
      return `${padding[0] || 0}px ${padding[1] || 0}px ${padding[2] || 0}px ${
        padding[3] || 0
      }px`;
    },
    items: [
      {
        propKey: "padding",
        index: 0,
      },
      {
        propKey: "padding",
        index: 1,
      },
      {
        propKey: "padding",
        index: 2,
      },
      {
        propKey: "padding",
        index: 3,
      },
    ],
  },
  buttonDecoration: {
    title: "Decoration",
    items: ["buttonStyle"],
  },
  containerDecoration: {
    title: "Decoration",
    props: ["radius", "shadow"],
    items: ["radius", "shadow"],
  },
  containerAlignment: {
    title: "Alignment",
    items: ["flexDirection", "fillSpace", "alignItems", "justifyContent"],
  },
  appearanceText: {
    title: "Appearance",
    props: ["color", "shadow"],
    summary: ({ color, shadow }: any) => {
      return (
        <div className="fletext-right">
          <p
            style={{
              color: color && `rgba(${Object.values(color)})`,
              textShadow: `0px 0px 2px rgba(0, 0, 0, ${shadow / 100})`,
            }}
            className="text-white text-right"
          >
            T
          </p>
        </div>
      );
    },
    items: ["color", "shadow"],
  },
  youtube: {
    title: "Youtube",
    items: ['videoId'],
  }
};

export const DEFAULT_PROP_KEYS = {
  fontSize: {
    propKey: "fontSize",
    type: ["slider", "text", "select"],
    label: "Font Size",
    full: true,
    selectChildren: [
      {
        value: "14",
        label: "14px",
      },
      {
        value: "16",
        label: "16px",
      },
      {
        value: "18",
        label: "18px",
      },
    ],
  },
  textAlign: {
    propKey: "textAlign",
    type: "radio",
    label: "Align",
    radioChildren: [
      {
        value: "left",
        label: "Left",
      },
      {
        value: "center",
        label: "Center",
      },
      {
        value: "right",
        label: "Right",
      },
    ],
  },
  fontWeight: {
    propKey: "fontWeight",
    type: "radio",
    label: "Weight",
    radioChildren: [
      {
        value: "400",
        label: "Regular",
      },
      {
        value: "500",
        label: "Medium",
      },
      {
        value: "700",
        label: "Bold",
      },
    ],
  },
  margin: [
    {
      propKey: "margin",
      type: "slider",
      label: "Top",
      index: 0,
      full: true,
      styledCustomOptions: [
        {
          value: "mt-2",
          label: "Tiny",
        },
        {
          value: "mt-4",
          label: "Medium",
        },
      ],
    },
    {
      propKey: "margin",
      type: "slider",
      label: "Right",
      index: 1,
      full: true,
      styledCustomOptions: [
        {
          value: "mr-2",
          label: "Tiny",
        },
        {
          value: "mr-4",
          label: "Medium",
        },
      ],
    },
    {
      propKey: "margin",
      type: "slider",
      label: "Bottom",
      index: 2,
      full: true,
      styledCustomOptions: [
        {
          value: "mb-2",
          label: "Tiny",
        },
        {
          value: "mb-4",
          label: "Medium",
        },
      ],
    },
    {
      propKey: "margin",
      type: "slider",
      label: "Left",
      index: 3,
      full: true,
      styledCustomOptions: [
        {
          value: "ml-2",
          label: "Tiny",
        },
        {
          value: "ml-4",
          label: "Medium",
        },
      ],
    },
  ],
  color: {
    propKey: "color",
    type: "color",
    label: "Text",
  },
  background: {
    propKey: "background",
    type: "bg",
    label: "Background",
  },
  width: {
    propKey: "width",
    type: "text",
    label: "Width",
  },
  height: {
    propKey: "height",
    type: "text",
    label: "Height",
  },
  padding: [
    {
      propKey: "padding",
      type: "slider",
      label: "Top",
      index: 0,
      styledCustomOptions: [
        {
          value: "pt-2",
          label: "Tiny",
        },
        {
          value: "pt-4",
          label: "Medium",
        },
      ],
    },
    {
      propKey: "padding",
      type: "slider",
      label: "Right",
      index: 1,
      styledCustomOptions: [
        {
          value: "pr-2",
          label: "Tiny",
        },
        {
          value: "pr-4",
          label: "Medium",
        },
      ],
    },
    {
      propKey: "padding",
      type: "slider",
      label: "Bottom",
      index: 2,
      full: true,
      styledCustomOptions: [
        {
          value: "pb-2",
          label: "Tiny",
        },
        {
          value: "pb-4",
          label: "Medium",
        },
      ],
    },
    {
      propKey: "padding",
      type: "slider",
      label: "Left",
      index: 3,
      full: true,
      styledCustomOptions: [
        {
          value: "pl-2",
          label: "Tiny",
        },
        {
          value: "pl-4",
          label: "Medium",
        },
      ],
    },
  ],
  buttonStyle: {
    propKey: "buttonStyle",
    type: "radio",
    label: "Style",
    radioChildren: [
      {
        value: "full",
        label: "Full",
      },
      {
        value: "outline",
        label: "Outline",
      },
    ],
  },
  radius: {
    propKey: "radius",
    type: "slider",
    label: "Radius",
    full: true,
  },
  shadow: {
    propKey: "shadow",
    type: "slider",
    label: "Shadow",
  },
  flexDirection: {
    propKey: "flexDirection",
    type: "radio",
    label: "Flex Direction",
    radioChildren: [
      {
        value: "row",
        label: "Row",
      },
      {
        value: "column",
        label: "Column",
      },
    ],
  },
  fillSpace: {
    propKey: "fillSpace",
    type: "radio",
    label: "Fill space",
    radioChildren: [
      {
        value: "yes",
        label: "Yes",
      },
      {
        value: "no",
        label: "No",
      },
    ],
  },
  alignItems: {
    propKey: "alignItems",
    type: "radio",
    label: "Align Items",
    radioChildren: [
      {
        value: "flex-start",
        label: "Flex start",
      },
      {
        value: "center",
        label: "Center",
      },
      {
        value: "flex-end",
        label: "Flex end",
      },
    ],
  },
  justifyContent: {
    propKey: "justifyContent",
    type: "radio",
    label: "Justify Content",
    radioChildren: [
      {
        value: "flex-start",
        label: "Flex start",
      },
      {
        value: "center",
        label: "Center",
      },
      {
        value: "flex-end",
        label: "Flex end",
      },
      {
        value: "space-between",
        label: "Space between",
      },
      {
        value: "space-around",
        label: "Space around",
      },
      {
        value: "space-evenly",
        label: "Space evenly",
      },
    ],
  },
  videoId: {
    propKey: "videoId",
    type: "text",
    label: "Video ID",

  }
};
