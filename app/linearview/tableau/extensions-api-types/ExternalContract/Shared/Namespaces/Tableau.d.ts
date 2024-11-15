/**
 * The tableau namespace exists for organization and to avoid polluting
 * the global namespace. It contains no constructs other than sub-namespaces and the Tableau enumerations.
 */
declare namespace Tableau {
    enum AnalyticsObjectType {
        Cluster = "cluster",
        Forecast = "forecast",
        TrendLine = "trend-line"
    }
    enum AnnotationType {
        Mark = "mark",
        Point = "point",
        Area = "area"
    }
    enum ColumnType {
        Discrete = "discrete",
        Continuous = "continuous",
        Unknown = "unknown"
    }
    enum ClassNameKey {
        WorksheetTitle = "tableau-worksheet-title",
        Worksheet = "tableau-worksheet",
        Tooltip = "tableau-tooltip",
        StoryTitle = "tableau-story-title",
        DashboardTitle = "tableau-dashboard-title"
    }
    /**
     * What the object represents in a dashboard.
     */
    enum DashboardObjectType {
        Blank = "blank",
        Worksheet = "worksheet",
        QuickFilter = "quick-filter",
        ParameterControl = "parameter-control",
        PageFilter = "page-filter",
        Legend = "legend",
        Title = "title",
        Text = "text",
        Image = "image",
        WebPage = "web-page",
        Extension = "extension"
    }
    /**
     * Enum that represents the visibility state of a dashboard object.
     * @since 1.7.0
     */
    enum DashboardObjectVisibilityType {
        /** Used for turning on the visibility of a dashboard object.*/
        Show = "show",
        /** Used for turning off the visibility of a dashboard object.*/
        Hide = "hide"
    }
    /**
     * The different types of data a value can have
     */
    enum DataType {
        String = "string",
        Int = "int",
        Float = "float",
        Bool = "bool",
        Date = "date",
        DateTime = "date-time",
        Spatial = "spatial",
        Unknown = "unknown"
    }
    /**
     * Enum that represents the changes that occur to a dashboard object.
     */
    enum DashboardLayoutChange {
        /** A dashboard object was added */
        Added = "added",
        /** A dashboard object was removed */
        Removed = "removed",
        /** A dashboard object's floating state changed */
        IsFloatingChanged = "is-floating-changed",
        /** A dashboard object's visibility changed */
        IsVisibleChanged = "is-visible-changed",
        /** A dashboard object's position changed */
        PositionChanged = "position-changed",
        /** A dashboard object's size changed */
        SizeChanged = "size-changed",
        /** A dashboard object was renamed */
        NameChanged = "name-changed",
        /** A dashboard object is selected */
        Selected = "selected",
        /** A dashboard object is deselected */
        Deselected = "deselected",
        /** Navigate to another dashboard */
        DashboardChanged = "dashboard-changed"
    }
    /**
     * Valid date ranges for a relative date filter.
     */
    enum DateRangeType {
        Last = "last",
        LastN = "last-n",
        Next = "next",
        NextN = "next-n",
        Current = "current",
        ToDate = "to-date"
    }
    /**
     * Enum that represents the types of dialog popup styles.
     */
    enum DialogStyle {
        Window = "window",
        Modal = "modal",
        Modeless = "modeless"
    }
    enum EncodingType {
        Column = "column",
        Row = "row",
        Page = "page",
        Filter = "filter",
        MarksType = "marks-type",
        MeasureValues = "measure-values",
        Color = "color",
        Size = "size",
        Label = "label",
        Detail = "detail",
        Tooltip = "tooltip",
        Shape = "shape",
        Path = "path",
        Angle = "angle",
        Geometry = "geometry",
        Custom = "custom"
    }
    /**
     *  Type of aggregation on a field.
     */
    enum FieldAggregationType {
        Sum = "sum",
        Avg = "avg",
        Min = "min",
        Max = "max",
        Stdev = "stdev",
        Stdevp = "stdevp",
        Var = "var",
        Varp = "varp",
        Collect = "collect",
        Count = "count",
        Countd = "countd",
        Median = "median",
        Attr = "attr",
        None = "none",
        Year = "year",
        Qtr = "qtr",
        Month = "month",
        Day = "day",
        Hour = "hour",
        Minute = "minute",
        Second = "second",
        Week = "week",
        Weekday = "weekday",
        MonthYear = "month-year",
        Mdy = "mdy",
        End = "end",
        TruncYear = "trunc-year",
        TruncQtr = "trunc-qtr",
        TruncMonth = "trunc-month",
        TruncWeek = "trunc-week",
        TruncDay = "trunc-day",
        TruncHour = "trunc-hour",
        TruncMinute = "trunc-minute",
        TruncSecond = "trunc-second",
        Quart1 = "quart1",
        Quart3 = "quart3",
        Skewness = "skewness",
        Kurtosis = "kurtosis",
        InOut = "in-out",
        User = "user"
    }
    /**
     * Role of a field.
     */
    enum FieldRoleType {
        Dimension = "dimension",
        Measure = "measure",
        Unknown = "unknown"
    }
    /**
     * An enumeration of the valid types of filters that can be applied.
     */
    enum FilterType {
        Categorical = "categorical",
        Range = "range",
        Hierarchical = "hierarchical",
        RelativeDate = "relative-date"
    }
    /**
     * The different update types for applying filter
     */
    enum FilterUpdateType {
        Add = "add",
        All = "all",
        Replace = "replace",
        Remove = "remove"
    }
    /**
     * The domain type for a filter
     */
    enum FilterDomainType {
        /**
         * The domain values that are relevant to the specified filter
         * i.e. the domain is restricted by a previous filter
         */
        Relevant = "relevant",
        /**
         * list of all possible domain values from database
         */
        Database = "database"
    }
    /**
     * The option for specifying which values to include for filtering
     * Indicates what to do with null values for a given filter or mark selection call.
     */
    enum FilterNullOption {
        NullValues = "null-values",
        NonNullValues = "non-null-values",
        AllValues = "all-values"
    }
    /**
     * Enum that serves as a filter on the DataValues returned from `getSummaryDataReaderAsync`,
     * `getUnderlyingTableDataReaderAsync` and `getLogicalTableDataReaderAsync`.
     * This is an optimization of returned data values only. Tableau versions prior to 2021.2
     * will pass the data across and populate the DataValue properties.
     * Please note that all properties not requested will be `undefined` in the DataValue results.
     * @since 1.5.0
     */
    enum IncludeDataValuesOption {
        /** DataValues will include all properties.*/
        AllValues = "all-values",
        /** DataValues will only include value and nativeValue properties.*/
        OnlyNativeValues = "only-native-values",
        /** DataValues will only include formattedValue properties. */
        OnlyFormattedValues = "only-formatted-values"
    }
    /**
     * Type of mark for a given marks card in a viz.
     */
    enum MarkType {
        Bar = "bar",
        Line = "line",
        Area = "area",
        Square = "square",
        Circle = "circle",
        Shape = "shape",
        Text = "text",
        Map = "map",
        Pie = "pie",
        GanttBar = "gantt-bar",
        Polygon = "polygon",
        Heatmap = "heatmap",
        VizExtension = "viz-extension"
    }
    /**
     * An enumeration describing the different types of allowable values.
     * This is used for restricting the domain of a parameter
     */
    enum ParameterValueType {
        All = "all",
        List = "list",
        Range = "range"
    }
    /**
     * Date period used in filters and in parameters.
     */
    enum PeriodType {
        Years = "years",
        Quarters = "quarters",
        Months = "months",
        Weeks = "weeks",
        Days = "days",
        Hours = "hours",
        Minutes = "minutes",
        Seconds = "seconds"
    }
    enum QuickTableCalcType {
        RunningTotal = "running-total",
        Difference = "difference",
        PercentDifference = "percent-difference",
        PercentOfTotal = "percent-of-total",
        Rank = "rank",
        Percentile = "percentile",
        MovingAverage = "moving-average",
        YTDTotal = "ytd-total",
        CompoundGrowthRate = "compound-growth-rate",
        YearOverYearGrowth = "year-over-year-growth",
        YTDGrowth = "ytd-growth",
        Undefined = "undefined"
    }
    /**
     * Enum for specifying the selection type for select marks api.
     */
    enum SelectionUpdateType {
        Replace = "select-replace",
        Add = "select-add",
        Remove = "select-remove"
    }
    /**
     * Enum for specifying the select option for the `extensions.Worksheet.selectTuplesAsync` method.
     */
    enum SelectOptions {
        /**
         * Clears existing selection before selecting the tuples specified
         */
        Simple = "select-options-simple",
        /**
         * Adds specified tuples to the existing selection
         */
        Toggle = "select-options-toggle"
    }
    /**
     * The type of sheet a [[Sheet]] object represents
     */
    enum SheetType {
        Dashboard = "dashboard",
        Story = "story",
        Worksheet = "worksheet"
    }
    enum SortDirection {
        Increasing = "increasing",
        Decreasing = "decreasing"
    }
    enum TrendLineModelType {
        Linear = "linear",
        Logarithmic = "logarithmic",
        Exponential = "exponential",
        Polynomial = "polynomial"
    }
    /**
     * Enum that represents the replay speed of an animation.
     * @since 1.7.0
     */
    enum ReplaySpeedType {
        /** Used for setting the replay speed of an animation to 0.5x.*/
        Slow = "slow",
        /** Used for setting the replay speed of an animation to 1.0x.*/
        Normal = "normal",
        /** Used for setting the replay speed of an animation to 2.0x.*/
        Fast = "fast"
    }
    /**
     * Enum that represents the selection state of a level in a hierarchical filter
     * @since Extensions 1.10.0
     */
    enum HierarchicalLevelSelectionState {
        AllSelected = "all-selected",
        NoneSelected = "none-selected",
        SomeSelected = "some-selected",
        UnknownSelected = "unknown-selected"
    }
    /**
     * ZoneVisibilityType
     * @deprecated use DashboardObjectVisibilityType
     */
    type ZoneVisibilityType = DashboardObjectVisibilityType;
    const ZoneVisibilityType: {
        Show: DashboardObjectVisibilityType.Show;
        Hide: DashboardObjectVisibilityType.Hide;
    };
}
export = Tableau;
//# sourceMappingURL=Tableau.d.ts.map