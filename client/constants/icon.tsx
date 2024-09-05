import React from "react";
import {Feather} from '@expo/vector-icons';

export const icon = {
    Home: (props: any) => <Feather name="home" size={24} {...props} />,
    Profile: (props: any) => <Feather name="user" size={24} {...props} />,
    Diary: (props: any) => <Feather name="book" size={24} {...props} />,
    Recipes: (props: any) => <Feather name="file-text" size={24} {...props} />,
    New: (props: any) => <Feather name="plus-square" size={24} {...props} />,
  };