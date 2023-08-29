export interface DetailType {
    nsg?: any[]
    mg?: Mg[]
    tms?: number
    tps?: any[]
    lg?: Lg
    ts?: any[]
    mc?: Mc
    id?: number
    bt?: number
    ms?: number
    ne?: number
    vs?: Vs
    sid?: number
    smt?: number
    ty?: number
    ye?: string
    nm?: string
    sb?: Sb
}

export interface Mg {
    mty: number
    mks: Mk[]
    nm: string
}

export interface Mk {
    op: Op[]
    id: number
    ss: number
    au: number
}

export interface Op {
    nm: string
    ty: number
    od: number
}

export interface Lg {
    na: string
    id: number
    or: number
    lurl: string
    sid: number
    rid: number
    rnm: string
    hot: boolean
    slid: number
}

export interface Mc {
    pe: number
    r: boolean
}

export interface Vs {
    have: boolean
}

export interface Sb { }
