class Monster extends Entity {
  constructor(img, x, y, drawX, drawY, w, h,
    name, type, entNum, totalHP, damage) {
    
    super(img, x, y, drawX, drawY, w, h, type);
    
    this.name = name;
    this.entNum = entNum;
    this.hitPoints = 0;
    this.damage = damage;
    this.maxHP = totalHP;

  }
}