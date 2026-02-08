class Cooldown {
    constructor(ms) {
        this.ms = ms;
        this.timer = 0;
    }

    update(delta) {
        this.timer = Math.max(0, this.timer - delta);
    }

    isReady() {
        return this.timer === 0;
    }

    trigger() {
        this.timer = this.ms;
    }
}

export default Cooldown;