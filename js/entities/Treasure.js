class Treasure extends Entity {
  constructor(img, x, y, drawX, drawY,
    w, h, value, name, type, entNum) {
    
    super(img, x, y, drawX, drawY, w, h, type);
    
    this.name = name;
    this.value = value;
    this.entNum = entNum;
  }
}