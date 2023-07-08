interface props {
    name: string
}
export default class Player {
    public name: string
    constructor({ name }: props) {
        this.name = name
    }
}
