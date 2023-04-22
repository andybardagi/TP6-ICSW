import {City} from "@/pages/api/cities/models/City";

export class House {
    constructor(
        public readonly street: string,
        public readonly number: number,
        public readonly city: City,
        public readonly reference?: string,
    ) {}
}
