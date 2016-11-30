class Treasure extends Entity {
  constructor(img, sourceX, sourceY, drawX, drawY,
    w, h, value, name, type, entNum) {
    
    super(
      img, sourceX, sourceY, drawX,
      drawY, w, h, type
    );
    
    this.name = name;
    this.value = value;
    this.entNum = entNum;
  }
}