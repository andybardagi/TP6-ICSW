import { City } from '@/models/City';

export class House {
  constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly city: City,
    public readonly reference?: string
  ) {}
}
