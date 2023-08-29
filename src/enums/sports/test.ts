// a set of four specific things
type FavoriteColors =
    | "dark sienna"
    | "van dyke brown"
    | "yellow ochre"
    | "sap green"
    | "titanium white"
    | "phthalo green"
    | "prussian blue"
    | "cadium yellow"
    | [number, number, number]
    | { red: number; green: number; blue: number }

type NonStringColors = Exclude<FavoriteColors, string>