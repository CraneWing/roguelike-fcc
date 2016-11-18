class Food extends Entity {
  constructor(img, x, y, drawX, drawY, w, h,
  addsHealth, name, type, entNum) {
    super(img, x, y, drawX, drawY, w, h, type);
    
    this.entNum = entNum;
    this.name = name;
    this.addsHealth = addsHealth;
  }
}