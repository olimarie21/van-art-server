import { Entity, PrimaryColumn, Column } from 'typeorm'
import { Point } from 'geojson'

@Entity()

export class ArtLocation {
    @PrimaryColumn()
    id: number

    @Column({type: "varchar", nullable: true})
    locationTitle: string

    @Column({type: "varchar", nullable: true})
    locationDetail: string

    @Column({type: "geography", nullable: false,  spatialFeatureType: 'Point', })
    geolocation: Point

    @Column({type: "varchar", nullable: true})
    address: string

    @Column({type: "varchar", nullable: true})
    type: string

    @Column({type: "varchar", nullable: true})
    primaryMaterial: string

    @Column("simple-array")
    artists: string[]

    @Column("varchar")
    artDescription: string

    @Column({type: "varchar", nullable: true})
    image: string

    @Column({type: "simple-array", nullable: true})
    userImages: string[]
}