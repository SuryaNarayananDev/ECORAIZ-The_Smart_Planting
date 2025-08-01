// File: src/controllers/userController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async sendOtp(req, res) {
        try {
            const { email } = req.body;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const user = await User.findOneAndUpdate({ email }, { otp }, { new: true });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });

            await transporter.sendMail({
                from: `"App Support" <${process.env.MAIL_USER}>`,
                to: email,
                subject: 'Your OTP Code',
                text: `Your OTP is: ${otp}`
            });

            res.status(200).json({ message: 'OTP sent to email' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            const user = await User.findOne({ email });
            if (!user || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

            user.otp = undefined;
            await user.save();

            res.status(200).json({ message: 'OTP verified successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, newPassword } = req.body;
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });
            if (!user) return res.status(404).json({ message: 'User not found' });

            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;
