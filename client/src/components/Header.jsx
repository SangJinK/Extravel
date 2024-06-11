// src/Header.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../scss/Header.scss';
import logoImage from '../assets/img/logo_white.png';
import usaFlag from '../assets/flags/usa.png';
import koreaFlag from '../assets/flags/korea.png';
import japanFlag from '../assets/flags/japan.png';

const countryOptions = [
  {
    value: 'usa',
    label: (
      <>
        <img
          src={usaFlag}
          alt='USA Flag'
          className='flag'
        />{' '}
        USA
      </>
    ),
  },
  {
    value: 'korea',
    label: (
      <>
        <img
          src={koreaFlag}
          alt='Korea Flag'
          className='flag'
        />{' '}
        Korea
      </>
    ),
  },
  {
    value: 'japan',
    label: (
      <>
        <img
          src={japanFlag}
          alt='Japan Flag'
          className='flag'
        />{' '}
        Japan
      </>
    ),
  },
  // 필요한 국가를 추가
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
    if (selectedOption) {
      navigate(`/${selectedOption.value}`);
    }
  };

  return (
    <header
      className={`header ${scrolled ? 'scrolled' : ''}`}
    >
      <img src={logoImage} alt='Logo' className='logo' />
      <nav className='nav'>
        <ul className='menu'>
          <li>
            <Link to='/home'>패키지</Link>
          </li>
          <li>
            <Link to='/about'>뉴스</Link>
          </li>
          <li>
            <Link to='/services'>내정보</Link>
          </li>
          <li>
            <Link to='/contact'>Places</Link>
          </li>
          <li>
            <Select
              value={countryOptions.find(
                (option) => option.value === country,
              )}
              onChange={handleCountryChange}
              options={countryOptions}
              className='country-select'
              classNamePrefix='react-select'
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;