// DateNavigator.jsx

import Link from 'next/link';
import RemoveBtn from '../entry-component/RemoveButton';
import AddBtn from '../entry-component/AddButton';
import React, { useState, useEffect } from 'react';
import styles from './datenav.module.css';
import API from '../../api/API';

const DateNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [apiDate, setApiDate] = useState(null); // New state variable for the date retrieved from the API

  const handlePrevDay = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getTime() - 24 * 60 * 60 * 1000));
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getTime() + 24 * 60 * 60 * 1000));
  };

  const handleRemoveFoodItem = (id) => {
    setFoodItems((prevFoodItems) => prevFoodItems.filter((item) => item._id !== id));
    setFilteredItems((prevFilteredItems) => prevFilteredItems.filter((item) => item._id !== id));
  };

  const handleAddFoodItem = (newFoodItem) => {
    // Update local state variables
    setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);
    setFilteredItems((prevFilteredItems) => [...prevFilteredItems, newFoodItem]);

  };
  

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await API.getDate(
          currentDate.getMonth() + 1,
          currentDate.getDate(),
          currentDate.getFullYear()
        );
        setApiDate(res);
        setFoodItems(res.foodItems || []);
      } catch (error) {
        setFoodItems([]);

      }
    };

    fetchFoodItems();
  }, [currentDate]);

  useEffect(() => {
    const filterItems = () => {
      let filtered = [...foodItems];

      if (currentDate.getMonth() + 1 !== null) {
        filtered = filtered.filter((entry) => entry.month === currentDate.getMonth() + 1);
      }
      if (currentDate.getDate() !== null) {
        filtered = filtered.filter((entry) => entry.date === currentDate.getDate());
      }
      if (currentDate.getFullYear() !== null) {
        filtered = filtered.filter((entry) => entry.year === currentDate.getFullYear());
      }

      setFilteredItems(filtered);
    };

    filterItems();
  }, [currentDate, foodItems]);

  const toDisplay = filteredItems.length ? filteredItems : foodItems;

  return (
    <div className={styles.dateNavStyle}>
    <h1 className={styles.titleStyle}>Diet Calendar</h1>
      <div className={styles.container}>
        <button onClick={handlePrevDay} className={`${styles.button}${styles.prevNextButton}`}>
            &#x2B05;
        </button>
        <div className={styles.dateRectangle}>{currentDate.toDateString()}</div>
        <button onClick={handleNextDay} className={`${styles.button}${styles.prevNextButton}`}>
            &#x27A1;
        </button>
      </div>
      {toDisplay.map((t) => (
        <div className={styles.containerStyle} key={t._id}>
          <div>
            <h2 className={styles.headerStyle}>{t.name}</h2>
            <div>{t.amount}</div>
            <div>{t.calories} calories</div>
          </div>

          <div>
          <RemoveBtn dateId={apiDate._id} foodId={t._id} onRemove={handleRemoveFoodItem} />
          </div>
        </div>
      ))}
      <AddBtn apiDate={apiDate} onAddFoodItem={handleAddFoodItem} />
    </div>
  );
};

export default DateNavigator;
