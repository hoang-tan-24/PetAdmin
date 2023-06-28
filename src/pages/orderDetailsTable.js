import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar } from '@mui/material';

const OrderDetailsTable = ({ orderDetails }) => {
    return (
        <Table >
            <TableHead >
                <TableRow >
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Ghi chú</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Tổng cộng</TableCell>
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
