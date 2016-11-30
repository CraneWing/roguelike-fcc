class Monster extends Entity {
  constructor(img, sourceX, sourceY, drawX, drawY, w, h,
    name, type, entNum, totalHP, damage) {
    
    super(img, sourceX, sourceY, drawX, drawY, w, h, type);
    
    this.name = name;
    this.entNum = entNum;
    this.hitPoints = 0;
    this.damage = damage;
    this.maxHP = totalHP;

  }
}