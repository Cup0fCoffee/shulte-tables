import {
  render,
  screen,
  getAllByRole,
  fireEvent,
} from '@testing-library/react';
import App from './App';

describe('App Component Tests', () => {
  it('renders ShulteTable', () => {
    render(<App />);
    const shulteTable = document.querySelector('.shulte-table');
    expect(shulteTable).toBeInTheDocument();
  });

  it('ShulteTable size is 3x3 by default', () => {
    render(<App />);
    const shulteTable = document.querySelector('.shulte-table');
    const rows = getAllByRole(shulteTable, 'row');
    expect(rows.length).toBe(3);
    rows.forEach((row) => {
      const cells = getAllByRole(row, 'cell');
      expect(cells.length).toBe(3);
    });
  });

  it('renders Settings', () => {
    render(<App />);
    const settings = document.querySelector('.settings');
    expect(settings).toBeInTheDocument();
  });

  it('default grid size setting is 3', () => {
    render(<App />);
    const gridSizeSlider = screen.getByRole('slider', { name: /grid size/i});
    expect(gridSizeSlider).toHaveValue('3');
  });

  it.each([
    2, 5, 7
  ])('ShulteTable size changes when changing grid size through settings', (newGridSize) => {
    render(<App />);

    const gridSizeSlider = screen.getByRole('slider', { name: /grid size/i});
    fireEvent.change(
      gridSizeSlider,
      { target: { value: newGridSize } }
    );

    expect(gridSizeSlider).toHaveValue(newGridSize.toString());
    const shulteTable = document.querySelector('.shulte-table');
    const rows = getAllByRole(shulteTable, 'row');
    expect(rows.length).toBe(newGridSize);
    rows.forEach((row) => {
      const cells = getAllByRole(row, 'cell');
      expect(cells.length).toBe(newGridSize);
    });
  });

  it('ShulteTable width is 100% by default', () => {
    render(<App />);
    const shulteTable = document.querySelector('.shulte-table');
    expect(shulteTable).toHaveStyle('width: 100%');
  });

  it('default grid width setting is 100%', () => {
    render(<App />);
    const gridWidthSlider = screen.getByRole('slider', { name: /grid width/i});
    expect(gridWidthSlider).toHaveValue('100');
  });

  it.each([
    33, 66, 99
  ])('ShulteTable width changes when changing grid width through settings', (gridWidth) => {
    render(<App />);

    const gridWidthSlider = screen.getByRole('slider', { name: /grid width/i});
    fireEvent.change(
      gridWidthSlider,
      { target: { value: gridWidth } }
    );

    expect(gridWidthSlider).toHaveValue(gridWidth.toString());
    const shulteTable = document.querySelector('.shulte-table');
    expect(shulteTable).toHaveStyle(`width: ${gridWidth}%`);
  });

  it.each([
    2, 5, 7
  ])('loads grid size from localStorage', (size) => {
    localStorage.setItem('settings', JSON.stringify({size}));
    render(<App />);
    const gridSizeSlider = screen.getByRole('slider', { name: /grid size/i});
    expect(gridSizeSlider).toHaveValue(size.toString());
  });

  it.each([
    33, 66, 99
  ])('loads grid width from localStorage', (width) => {
    localStorage.setItem('settings', JSON.stringify({width}));
    render(<App />);
    const gridWidthSlider = screen.getByRole('slider', { name: /grid width/i});
    expect(gridWidthSlider).toHaveValue(width.toString());
  });

  it.each([
    2, 5, 7
  ])('saves grid size to localStorage', (size) => {
    render(<App />);

    const gridSizeSlider = screen.getByRole('slider', { name: /grid size/i});
    fireEvent.change(
      gridSizeSlider,
      { target: { value: size } }
    );

    const settings = JSON.parse(localStorage.getItem('settings'));
    expect(settings.size).toEqual(size);
  });

  it.each([
    33, 66, 99
  ])('saves grid width to localStorage', (width) => {
    render(<App />);

    const gridWidthSlider = screen.getByRole('slider', { name: /grid width/i});
    fireEvent.change(
      gridWidthSlider,
      { target: { value: width } }
    );

    const settings = JSON.parse(localStorage.getItem('settings'));
    expect(settings.width).toEqual(width);
  });
});
