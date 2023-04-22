import { City } from "./City";

export class Location { 
    constructor(
        public readonly street: string,
        public readonly number: number,
        public readonly city: City,
        public readonly reference?: string
    ) {}
}