const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data.json');

// Initialize data structure
const initialData = {
  products: [],
  users: [],
  carts: {},
  wishlists: {},
  orders: []
};

// Load data from file or create new file if it doesn't exist
function loadData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    } else {
      fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
  } catch (error) {
    console.error('Error loading data:', error);
    return initialData;
  }
}

// Save data to file
function saveData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Get all items from a collection
function getAll(collection) {
  const data = loadData();
  if (!data[collection]) {
    data[collection] = collection === 'carts' || collection === 'wishlists' ? {} : [];
    saveData(data);
  }
  return data[collection] || [];
}

// Get a single item by id from a collection
function getById(collection, id) {
  const data = loadData();
  if (!data[collection]) {
    data[collection] = collection === 'carts' || collection === 'wishlists' ? {} : [];
    saveData(data);
  }
  if (collection === 'carts' || collection === 'wishlists') {
    return data[collection][id];
  }
  return data[collection].find(item => item.id === id);
}

// Add an item to a collection
function add(collection, item) {
  const data = loadData();
  if (!data[collection]) {
    data[collection] = collection === 'carts' || collection === 'wishlists' ? {} : [];
  }
  if (collection === 'carts' || collection === 'wishlists') {
    data[collection][item.id] = item;
  } else {
    data[collection].push(item);
  }
  saveData(data);
  return item;
}

// Update an item in a collection
function update(collection, id, updatedItem) {
  const data = loadData();
  if (!data[collection]) {
    data[collection] = collection === 'carts' || collection === 'wishlists' ? {} : [];
  }
  if (collection === 'carts' || collection === 'wishlists') {
    data[collection][id] = { ...data[collection][id], ...updatedItem };
    saveData(data);
    return data[collection][id];
  } else {
    const index = data[collection].findIndex(item => item.id === id);
    if (index !== -1) {
      data[collection][index] = { ...data[collection][index], ...updatedItem };
      saveData(data);
      return data[collection][index];
    }
  }
  return null;
}

// Remove an item from a collection
function remove(collection, id) {
  const data = loadData();
  if (!data[collection]) {
    data[collection] = collection === 'carts' || collection === 'wishlists' ? {} : [];
    saveData(data);
    return null;
  }
  if (collection === 'carts' || collection === 'wishlists') {
    const removedItem = data[collection][id];
    delete data[collection][id];
    saveData(data);
    return removedItem;
  } else {
    const index = data[collection].findIndex(item => item.id === id);
    if (index !== -1) {
      const removedItem = data[collection].splice(index, 1)[0];
      saveData(data);
      return removedItem;
    }
  }
  return null;
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
