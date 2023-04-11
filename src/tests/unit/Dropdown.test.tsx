import React, { useState } from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Dropdown from '../../components/Dropdown';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Dropdown', () => {
    // Run this before each test
    beforeEach(() => {
        render(
            <Dropdown
                dropdownName="test"
                value={['test1', 'test2', 'test3']}
            />
        )
    });

    // Testcase
    it('should render Dropdown', async () => {
        const dropdownButton = await screen.findByTestId('dropdown-button');
        const dropdownCheckBox = await screen.findByTestId('dropdown-checkbox');
        expect(dropdownButton).toBeVisible();
        expect(dropdownCheckBox).toBeVisible();

    });
    
    it('should render list items from dropdown', async () => {
        const dropdownButton = await screen.findByTestId('dropdown-button');
        const dropdownCheckBox = await screen.findByTestId('dropdown-checkbox');
        
        await user.click(dropdownButton);
        const listCheckBox = await screen.findAllByTestId('list-checkbox');
        expect(dropdownButton).toBeVisible();
        expect(dropdownCheckBox).toBeVisible();
        expect(listCheckBox[0]).toBeVisible();
        expect(listCheckBox[1]).toBeVisible();
        expect(listCheckBox[2]).toBeVisible();
    });

    it('checkboxes should be checked to begin with', async () => {
        const dropdownButton = await screen.findByTestId('dropdown-button');
        const dropdownCheckBox = await (await screen.findByTestId('dropdown-checkbox')).querySelector('input[type="checkbox"]');
        await user.click(dropdownButton);
        const listCheckBox = await screen.findAllByTestId('list-checkbox');
        const test1 = await listCheckBox[0].querySelector('input[type="checkbox"]');
        const test2 = await listCheckBox[1].querySelector('input[type="checkbox"]');
        const test3 = await listCheckBox[2].querySelector('input[type="checkbox"]');
        expect(dropdownCheckBox).toHaveProperty('checked', true);
        expect(test1).toHaveProperty('checked', true);
        expect(test2).toHaveProperty('checked', true);
        expect(test3).toHaveProperty('checked', true);
    });

    it('checkboxes should have standard logik', async () => {
        const dropdownButton = await screen.findByTestId('dropdown-button');
        const dropdownCheckBox = await screen.findByTestId('dropdown-checkbox') as HTMLInputElement;
        const selectAll = await dropdownCheckBox.querySelector('input[type="checkbox"]');
        await user.click(dropdownButton);
        const listCheckBox = await screen.findAllByTestId('list-checkbox');
        const test1 = await listCheckBox[0].querySelector('input[type="checkbox"]');
        const test2 = await listCheckBox[1].querySelector('input[type="checkbox"]');
        const test3 = await listCheckBox[2].querySelector('input[type="checkbox"]');
        await fireEvent.change(dropdownCheckBox.childNodes[0], { target: { checked: false } });
        await fireEvent.change(listCheckBox[0].childNodes[0], { target: { checked: false } });
        await fireEvent.change(listCheckBox[1].childNodes[0], { target: { checked: false } });
        await fireEvent.change(listCheckBox[2].childNodes[0], { target: { checked: false } });

        expect(selectAll).toHaveProperty('checked', false);
        expect(test1).toHaveProperty('checked', false);
        expect(test2).toHaveProperty('checked', false);
        expect(test3).toHaveProperty('checked', false);
       

    });
    
    // Run this after each test
    afterEach(() => {
        cleanup();
    });
});
