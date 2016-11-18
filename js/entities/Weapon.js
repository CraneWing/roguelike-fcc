class Weapon extends Entity {
  constructor(img, x, y, drawX, drawY, w, h,
   damage, name, type, entNum) {
    super(img, x, y, drawX, drawY, w, h, type);
    this.name = name;
    this.damage = damage;
    this.entNum = entNum;
  }
}