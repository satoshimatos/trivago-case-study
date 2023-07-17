import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Locations } from "./TempLocations"

@Entity('item')

export class Items {
    @PrimaryGeneratedColumn()
    item_id: number

    @Column()
    name: string

    @Column()
    rating: number

    @Column()
    category: number

    @Column()
    image: string

    @Column()
    reputation: number

    @Column()
    reputation_badge: string

    @Column()
    price: number

    @Column()
    availability: number

    @ManyToOne(() => Locations)
    @JoinColumn({ name: 'location_id' })
    location: Locations
}