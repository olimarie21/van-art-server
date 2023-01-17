import { Entity, PrimaryColumn, Column } from 'typeorm'
import { Point } from 'geojson'

@Entity()

export class ArtLocation {
    @PrimaryColumn()
    id: number

    @Column("varchar")
    locationTitle: string

    @Column({type: "varchar", nullable: true})
    locationDetail: string

    @Column({type: "geography", nullable: false,  spatialFeatureType: 'Point', })
    geolocation: Point

    @Column("varchar")
    address: string

    @Column("varchar")
    type: string

    @Column("varchar")
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