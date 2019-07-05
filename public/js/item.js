class Item {
  id;
  title;
  icon;
  focusTime;
  breakTime;

  constructor(
    title = "Default Title",
    icon = "event_note",
    focusTime = "1500000",
    breakTime = "300000"
  ) {
    this.title = title;
    this.icon = icon;
    this.focusTime = focusTime;
    this.breakTime = breakTime;

    this.id = title.trim().replace(' ', '') + Date.now();
  }
}
