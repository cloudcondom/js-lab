/**
 * @class Item
 * @description Представляет предмет в инвентаре.
 */
class Item {
  /**
   * Создаёт новый предмет.
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
  
   * @returns {string} Описание предмета.
   */
  getInfo() {
    return `[${this.rarity.toUpperCase()}] ${this.name} | Вес: ${this.weight} кг`;
  }

  /**
   * Изменяет вес предмета.
   * @param {number} newWeight
   * @returns {void}
   */
  setWeight(newWeight) {
    this.weight = newWeight;
    console.log(`Вес предмета "${this.name}" изменён на ${newWeight} кг`);
  }
}

/**
 * @class Weapon
 * @extends Item
 * @description 
 */
class Weapon extends Item {
  /**
   * Создаёт новое оружие.
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   * @param {number} damage
   * @param {number} durability
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = Math.min(100, Math.max(0, durability));
  }

  /**
   * Возвращает строку с полной информацией об оружии.
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()} | Урон: ${this.damage} | Прочность: ${this.durability}/100`;
  }

  /**
   * Использует оружие: уменьшает прочность на 10.
   * Если прочность уже 0 — выводит предупреждение.
   * @returns {void}
   */
  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
      console.log(`"${this.name}" использовано. Прочность: ${this.durability}/100`);
    } else {
      console.log(`"${this.name}" сломано и не может быть использовано!`);
    }
  }

  /**
   * Чинит оружие: восстанавливает прочность до 100.
   * @returns {void}
   */
  repair() {
    this.durability = 100;
    console.log(`"${this.name}" починено. Прочность: ${this.durability}/100`);
  }
}
console.log("=== ШАГ 3: Тестирование классов ===\n");

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

console.log();

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(`Прочность после использования: ${bow.durability}`);
bow.repair();
console.log(`Прочность после починки: ${bow.durability}`);

console.log();

const axe = new Weapon("Dark Axe", 5.0, "legendary", 40, 10);
console.log(axe.getInfo());
axe.use(); // прочность 0
axe.use(); // сломано — предупреждение
console.log("\n=== ШАГ 4: Функции-конструкторы ===\n");

/**
 * @constructor ItemConstructor
 * @description Функция-конструктор для создания предметов инвентаря.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета (в кг).
 * @param {string} rarity - Редкость предмета.
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * Возвращает строку с информацией о предмете.
 * @returns {string} Описание предмета.
 */
ItemConstructor.prototype.getInfo = function () {
  return `[${this.rarity.toUpperCase()}] ${this.name} | Вес: ${this.weight} кг`;
};

/**
 * Изменяет вес предмета.
 * @param {number} newWeight - Новый вес предмета (в кг).
 * @returns {void}
 */
ItemConstructor.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
  console.log(`Вес предмета "${this.name}" изменён на ${newWeight} кг`);
};

/**
 * @constructor WeaponConstructor
 * @description Функция-конструктор для создания оружия. Наследует ItemConstructor.
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес оружия (в кг).
 * @param {string} rarity - Редкость оружия.
 * @param {number} damage - Урон оружия.
 * @param {number} durability - Начальная прочность (0–100).
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity); // вызов родительского конструктора
  this.damage = damage;
  this.durability = Math.min(100, Math.max(0, durability));
}

// Настройка цепочки прототипов (наследование)
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

/**
 * Возвращает строку с полной информацией об оружии.
 * @returns {string} Описание оружия, включая урон и прочность.
 */
WeaponConstructor.prototype.getInfo = function () {
  const base = ItemConstructor.prototype.getInfo.call(this);
  return `${base} | Урон: ${this.damage} | Прочность: ${this.durability}/100`;
};

/**
 * Использует оружие: уменьшает прочность на 10.
 * @returns {void}
 */
WeaponConstructor.prototype.use = function () {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
    console.log(`"${this.name}" использовано. Прочность: ${this.durability}/100`);
  } else {
    console.log(`"${this.name}" сломано!`);
  }
};

/**
 * Чинит оружие: восстанавливает прочность до 100.
 * @returns {void}
 */
WeaponConstructor.prototype.repair = function () {
  this.durability = 100;
  console.log(`"${this.name}" починено. Прочность: ${this.durability}/100`);
};

// --- Тестирование функций-конструкторов ---

const dagger = new ItemConstructor("Iron Dagger", 0.8, "common");
console.log(dagger.getInfo());
dagger.setWeight(1.0);

console.log();

const staff = new WeaponConstructor("Magic Staff", 1.5, "legendary", 60, 80);
console.log(staff.getInfo());
staff.use();

// --- Опциональная цепочка (?.) ---

console.log("\n=== Опциональная цепочка (?.) ===\n");

/** @type {WeaponConstructor|null} */
const maybeWeapon = null;

// Без ?. это вызвало бы TypeError: Cannot read properties of null
const info = maybeWeapon?.getInfo();
console.log(`Информация об оружии: ${info ?? "предмет не существует"}`);

// Вложенный доступ через ?.
const items = [
  new WeaponConstructor("Spear", 3.0, "uncommon", 25, 50),
  null,
  new ItemConstructor("Health Potion", 0.2, "common"),
];

items.forEach((item, i) => {
  // item?.getInfo() безопасно — не бросит ошибку, если item === null
  const desc = item?.getInfo() ?? "пустой слот";
  console.log(`Слот ${i + 1}: ${desc}`);
});
