import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar } from '@mui/material';

const OrderDetailsTable = ({ orderDetails }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderDetails.map((detail) => (
                    <TableRow key={detail.id}>
                        <TableCell>
                            {detail.product && detail.product.image && (
                                <Avatar src={detail.product.image} />
                            )}
                            {detail.pet && detail.pet.image && (
                                <Avatar src={detail.pet.image} />
                            )}
                            {detail.service && detail.service.image && (
                                <Avatar src={detail.service.image} alt="Img" />
                            )}</TableCell>
                        <TableCell>{detail.name}</TableCell>
                        <TableCell>{detail.description}</TableCell>
                        <TableCell>{detail.price}</TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>{detail.totalPrice}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrderDetailsTable;
