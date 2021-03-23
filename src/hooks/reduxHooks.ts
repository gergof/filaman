import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, AppState } from '../data/store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useAppDispatch, useAppSelector };
