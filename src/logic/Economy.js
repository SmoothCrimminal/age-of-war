class Economy {
    constructor() {
        this.gold = 500;
    }

    addGold(amount) {
        this.gold += amount;
    }

    canAfford(cost) {
        return this.gold >= cost;
    }

    spend(cost) {
        if (!this.canAfford(cost))
            return false;

        this.gold -= cost;
        return true;
    }

    getGold() {
        return Math.floor(this.gold);
    }
}

export default Economy;