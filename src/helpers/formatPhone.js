export default function (phone) {
    phone = phone.replace(/[ `~()-]/g, '');
    return phone;
}