import { Document } from 'mongodb';
import IUser from './user';

export default interface IBlog extends Document {
    title: string;
    author: IUser;
    content: string;
    headline: string;
    picture?: string;
}
