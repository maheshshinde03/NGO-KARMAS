export interface BreakDownCondition2Model {
    columnName: string;
    operator: string;
    from: string;
    to: string;
    rate: string;
    isSlab: boolean;
    type: string;
}

export interface BreakDownConditionModel {
    condition2: string;
    city: string;
    columnName: string;
    operator: string;
    condition: string;
    operatorDesc: string;
}