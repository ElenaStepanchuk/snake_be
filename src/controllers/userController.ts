import { Request, Response } from 'express';
import AppDataSource from '../index';
import { User } from '../entities/user.entity';

export const createUser = async (req: Request, res: Response) => {
  const { user_name, speed, points } = req.body;
  if (!user_name) {
    return res.status(400).send({ message: 'User name, speed, and points are required' });
  }

  const user = new User();
  user.user_name = user_name;
  user.speed = speed || 0;
  user.points = points || 0;

  try {
    await AppDataSource.manager.save(user);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error saving user' });
  }
};

export const findUserById = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);

  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error finding user' });
  }
};

export const findUserByName = async (req: Request, res: Response) => {
  const name: string = req.params.name;

  try {
    const user = await AppDataSource.manager.findOne(User, { where: { user_name: name } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error finding user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);
  const { user_name, speed, points } = req.body;

  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user_name) user.user_name = user_name;
    if (speed) user.speed = speed;
    if (points) user.points = points;

    await AppDataSource.manager.save(user);

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating user' });
  }
};

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.manager.find(User);

    if (!users || users.length === 0) {
      return res.status(404).send({ message: 'No users found' });
    }

    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error finding users' });
  }
};
