let Schema = {
  "!top": ["Grid", "StackPanel"],
  "!attrs": {
    "x:Name": null,
    "x:Key": null
  },
  ResourceDictionary: {
    children: ["FrameworkTemplate", "Brush", "Transform", "UIElement"]
  },
  UIElement: {
    attrs: {
      IsEnabled: ["True", "False"],
      Focusable: ["True", "False"],
      RenderTransformOrigin: null,
      RenderTransform: "Transform",
      LayoutTransform: "Transform",
      Visibility: ["Collapsed", "Hidden", "Visible"]
    }
  },
  FrameworkElement: {
    attrs: {
      Width: null,
      Height: null,
      MinWidth: null,
      MaxWidth: null,
      MinHeight: null,
      MaxHeight: null,
      Margin: null,
      HorizontalAlignment: ["Left", "Right", "Center", "Stretch"],
      VerticalAlignment: ["Top", "Bottom", "Center", "Stretch"],
      Resources: "ResourceDictionary",
      Style: "Style",
      Tag: null,
      DataContext: null,
      Triggers: "TriggerBase"
    },
    base: "UIElement"
  },
  Decorator: {
    attrs: {
      Child: null
    },
    base: "FrameworkElement",
    children: ["UIElement"]
  },
  Border: {
    attrs: {
      Background: "Brush",
      BorderBrush: "Brush",
      BorderThickness: null,
      CornerRadius: null,
      Padding: null
    },
    base: "Decorator"
  },
  Panel: {
    type: "abstract",
    attrs: {
      Background: "Brush",
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
      Foreground: "Brush",
      Background: "Brush",
      BorderBrush: "Brush",
      BorderThickness: null,
      Padding: null
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
    type: "abstract",
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
    type: "abstract",
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
    type: "abstract",
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
    type: "abstract",
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
  },
  RadialGradientBrush: {
    attrs: {
      Center: null,
      GradientOrigin: null,
      RadiusX: null,
      RadiusY: null
    },
    base: "GradientBrush"
  },
  TileBrush: {
    type: "abstract",
    attrs: {
      AlignmentX: ["Left", "Right", "Center"],
      AlignmentY: ["Top", "Bottom", "Center"],
      Stretch: ["None", "Fill", "Uniform", "UniformToFill"],
      TileMode: ["None", "Tile", "FlipX", "FlipY", "FlipXY"],
      Viewbox: null,
      ViewboxUnits: ["Absolute", "RelativeToBoundingBox"],
      Viewport: null,
      ViewportUnits: ["Absolute", "RelativeToBoundingBox"]
    },
    base: "Brush"
  },
  ImageBrush: {
    attrs: {
      ImageSource: null
    },
    base: "TileBrush"
  },
  VisualBrush: {
    attrs: {
      Visual: "FrameworkElement"
    },
    base: "TileBrush"
  },
  Transform: {
    attrs: {}
  },
  TransformGroup: {
    attrs: {
      Children: "Transform"
    },
    base: "Transform",
    children: ["Transform"]
  },
  TranslateTransform: {
    attrs: {
      X: null,
      Y: null
    },
    base: "Transform",
  },
  ScaleTransform: {
    attrs: {
      ScaleX: null,
      ScaleY: null
    },
    base: "Transform"
  },
  SkewTransform: {
    attrs: {
      AngleX: null,
      AngleY: null,
      CenterX: null,
      CenterY: null
    },
    base: "Transform"
  },
  RotateTransform: {
    attrs: {
      Angle: null,
      CenterX: null,
      CenterY: null
    },
    base: "Transform"
  },
  FrameworkTemplate: {
    type: "abstract",
    attrs: {
      Resources: "ResourceDictionary",
      VisualTree: "FrameworkElement",
      Triggers: "TriggerBase"
    },
    children: ["FrameworkElement"]
  },
  ControlTemplate: {
    attrs: {
      TargetType: null
    },
    base: "FrameworkTemplate"
  },
  DataTemplate: {
    attrs: {
      DataType: null
    },
    base: "FrameworkTemplate"
  },
  Style: {
    attrs: {
      Resources: "ResourceDictionary",
      Setters: "Setter",
      Triggers: "TriggerBase"
    },
    children: ["Setter"]
  },
  TriggerBase: {
    type: "abstract",
    attrs: {
      EnterActions: null,
      ExitActions: null
    }
  },
  Trigger: {
    attrs: {
      Property: null,
      Value: null,
      SourceName: null,
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  MultiTrigger: {
    attrs: {
      Conditions: "Condition",
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  DataTrigger: {
    attrs: {
      Binding: "BindingBase",
      Value: null,
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  MultiDataTrigger: {
    attrs: {
      Conditions: "Condition",
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  EventTrigger: {
    attrs: {
      Actions: null
    },
    base: "TriggerBase"
  },
  Setter: {
    attrs: {
      Property: null,
      Value: null,
      TargetName: null
    }
  },
  Condition: {
    attrs: {
      Binding: "BindingBase",
      Property: null,
      Value: null
    }
  },
  BindingBase: {
    type: "abstract",
    attrs: {
      Delay: null,
      FallbackValue: null,
      TargetNullValue: null,
      StringFormat: null
    }
  },
  Binding: {
    type: "markup",
    attrs: {
      Path: null,
      ElementName: null,
      Source: null,
      RelativeSource: "RelativeSource",
      Converter: null,
      ConverterParameter: null,
      Mode: ["OneTime", "OneWay", "OneWayToSource", "TwoWay"],
      UpdateSourceTrigger: ["PropertyChanged", "LostFocus", "Explicit"]
    },
    base: "BindingBase"
  },
  MultiBinding: {
    type: "markup",
    attrs: {
      Bindings: "Binding",
      Converter: null,
      ConverterParameter: null,
      Mode: ["OneTime", "OneWay", "OneWayToSource", "TwoWay"],
      UpdateSourceTrigger: ["PropertyChanged", "LostFocus", "Explicit"]
    },
    base: "BindingBase",
    children: ["Binding"]
  },
  TemplateBinding: {
    type: "markup",
    attrs: {
      Property: null
    }
  },
  StaticResource: {
    type: "markup",
    attrs: {
      ResourceKey: null
    }
  },
  DynamicResource: {
    type: "markup",
    attrs: {
      ResourceKey: null
    }
  },
  'x:Type': {
    type: "markup",
    attrs: {
      Type: null,
      TypeName: null
    }
  },
  'x:Static': {
    type: "markup",
    attrs: {
      Member: null
    }
  },
  'x:Null': {
    type: "markup",
    attrs: {}
  }
};

export default Schema