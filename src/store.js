import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, createMigrate  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from "./slices/cart"
import authReducer from "./slices/auth"
import accountImagesReducer from "./slices/accountimages"
import builderReducer from "./slices/builder"


const migrations = {
    // Migration to add 'settings' field to the state
    1: (state) => {
        return {
            ...state.builder,
            settings: state.builder.settings || {"header": null, "body": null, "footer": null},
        };
    },
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    migrate: createMigrate(migrations, { debug: false }),
    whitelist: ["auth", "cart", "builder"],
};

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    accountImages: accountImagesReducer,
    builder: builderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
            },
        }),
});

export const persistor = persistStore(store);