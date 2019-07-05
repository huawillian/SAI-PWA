class Item {
  id;
  title;
  icon;
  color;
  focusTime;
  breakTime;

  constructor(
    title = "Default Title",
    icon = "event_note",
    color = "green",
    focusTime = "1500000",
    breakTime = "300000"
  ) {
    this.title = title;
    this.icon = icon;
    this.color = color;
    this.focusTime = focusTime;
    this.breakTime = breakTime;

    this.id = title.trim().replace(' ', '') + Date.now();
  }
}
