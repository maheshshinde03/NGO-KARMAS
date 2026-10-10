import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RateDetailsService {

    private queryString2: string = '';
    private rateValue: string = '';
    private weightColumn: string = '';

    constructor() { }

    generateCondition2(element: any): string {
        let { columnName, from, to, rate, isSlab } = element;

        let condition: string;
        if (isSlab) {
            condition = `CASE (WHEN ${columnName} BETWEEN ${from} AND ${to} `;
            condition += `THEN ${rate} * ${columnName}) END~`;
        } else {
            condition = `select ${rate}`;
        }
        this.queryString2 += condition;
        return this.queryString2;
    }
}
