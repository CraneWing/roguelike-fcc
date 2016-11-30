class Food extends Entity {
  constructor(img, sourceX, sourceY, drawX, drawY, w, h,
  addsHealth, name, type, entNum) {
    super(img, sourceX, sourceY, drawX, drawY, w, h, type);
    
    this.entNum = entNum;
    this.name = name;
    this.addsHealth = addsHealth;
  }
}