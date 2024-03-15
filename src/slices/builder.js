import { createSlice } from '@reduxjs/toolkit'

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        components: {"header": null, "body": null, "footer": null},
        images: {"header": [], "body": [], "footer": []},
        texts: {"header": [], "body": [], "footer": []},
        settings: {"header": null, "body": null, "footer": null},
    },
    reducers: {
        addComponent: (state, action) => {
            state.components[action.payload.type] = action.payload.component;
        },
        addSetting: (state, action) => {
            state.settings[action.payload.type] = action.payload.setting;
        },
        addImage: (state, action) => {
            const { type, id, image } = action.payload;
            // Assuming each image has a unique 'id' property
            const existingIndex = state.images[type].findIndex((img) => img.id === id);
            if (existingIndex !== -1) {
                // If an image with the same ID exists, replace it
                state.images[type][existingIndex] = action.payload;
            } else {
                // If no such image exists, add the new one
                state.images[type].push(action.payload);
            }
        },
        addText: (state, action) => {
            const { type, id, text } = action.payload;
            // Assuming each image has a unique 'id' property
            const existingIndex = state.texts[type].findIndex((txt) => txt.id === id);
            if (existingIndex !== -1) {
                // If an image with the same ID exists, replace it
                state.texts[type][existingIndex] = action.payload;
            } else {
                // If no such image exists, add the new one
                state.texts[type].push(action.payload);
            }
        },
    },
})

export const { addComponent, addImage, addText, addSetting } = builderSlice.actions;

export default builderSlice.reducer;