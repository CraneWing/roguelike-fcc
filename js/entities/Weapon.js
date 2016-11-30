class Weapon extends Entity {
  constructor(img, sourceX, sourceY, drawX, drawY,
   w, h, damage, name, type, entNum) {
    
    super(img, sourceX, sourceY, drawX, drawY, w, h, type);
    this.name = name;
    this.damage = damage;
    this.entNum = entNum;
  }
}