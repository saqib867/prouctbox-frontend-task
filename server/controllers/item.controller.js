import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../init_data.json');

let items = [];

// Read data from file
const readDataFromFile = () => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading init_data.json:', err);
      return;
    }
    items = JSON.parse(data);
  });
};

// Write data to file
const writeDataToFile = () => {
  fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), (err) => {
    if (err) {
      console.error('Error writing to init_data.json:', err);
    }
  });
};

// Initialize data from file
readDataFromFile();

// GET all items
export const getItems = (req, res) => {
  const { checkedOut, search } = req.query;
  console.log("checkedout => ",checkedOut)
  

  // Filter by checkout status if provided
  
   let filteredItems = (checkedOut == true || checkedOut =='true') ? items.filter(item => (item.isCheckedOut == true || item.isCheckedOut == 'true')):items;
  

  // Apply search filter if the search query is provided
  if (search) {
    const searchLower = search.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }

  res.json(filteredItems);
};


// GET a single item by ID
export const getItemById = (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);
  item ? res.json(item) : res.status(404).json({ message: 'Item not found' });
};

// POST a new item
export const createItem = (req, res) => {
  const newItem = {
    id: items.length + 1,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    quantity: req.body.quantity,
    isCheckedOut: req.body.isCheckedOut
  };
  items.push(newItem);

  writeDataToFile();

  res.status(201).json(newItem);
};

// DELETE an item by ID
export const deleteItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items.splice(index, 1);

    writeDataToFile();

    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

export const checkoutItems = (req, res) => {
    const { itemIds } = req.body; // Expecting an array of item IDs
      console.log("itemid => ",itemIds)
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({ message: 'Invalid request: itemIds must be a non-empty array' });
    }
  
    let updatedItems = [];
    let notFoundItems = [];
  
    itemIds.forEach((id) => {
      const itemIndex = items.findIndex(i => i.id === id);
  
      if (itemIndex !== -1) {
        items[itemIndex].isCheckedOut = true;
        updatedItems.push(items[itemIndex]);
      } 
    });
  
    if (updatedItems.length > 0) {
      writeDataToFile();
    }
  
    res.json({
      message: 'Items updated successfully',
      updatedItems
    });
  };
  
