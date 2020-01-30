let Schema = {
  "!top": ["Grid", "StackPanel"],
  UIElement: {
    attrs: {
      Visibility: ["Collapsed", "Hidden", "Visible"]
    }
  },
  FrameworkElement: {
    attrs: {
      Width: null,
      Height: null,
      Margin: null,
      Resources: null
    },
    base: "UIElement"
  },
  Panel: {
    attrs: {
      Children: null
    },
    base: "FrameworkElement",
    children: ["UIElement"]
  },
  Grid: {
    attrs: {},
    base: "Panel"
  },
  StackPanel: {
    attrs: {},
    base: "Panel"
  },
  Control: {
    attrs: {
      Background: null,
      BorderBrush: null,
      BorderThickness: null
    },
    base: "FrameworkElement"
  },
  ContentControl: {
    attrs: {
      Content: null
    },
    base: "Control",
    children: ["UIElement"]
  },
  ButtonBase: {
    attrs: {
      ClickMode: null,
      Command: null,
      CommandParameter: null
    },
    base: "ContentControl"
  },
  Button: {
    attrs: {},
    base: "ButtonBase"
  },
  Shape: {
    attrs: {
      Fill: "LinearGradientBrush",
      Stroke: null,
      StrokeThickness: null
    },
    base: "FrameworkElement"
  },
  Rectangle: {
    attrs: {},
    base: "Shape"
  },
  Ellipse: {
    attrs: {},
    base: "Shape"
  },
  Brush: {
    attrs: {
      Opacity: null
    }
  },
  SolidColorBrush: {
    attrs: {
      Color: null
    },
    base: "Brush"
  },
  GradientBrush: {
    attrs: {
      GradientStops: null
    },
    base: "Brush",
    children: ["GradientStop"]
  },
  GradientStop: {
    attrs: {
      Offset: null,
      Color: null
    }
  },
  LinearGradientBrush: {
    attrs: {
      StartPoint: null,
      EndPoint: null
    },
    base: "GradientBrush"
  }
};

export default Schema