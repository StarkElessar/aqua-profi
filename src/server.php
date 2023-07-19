<?php
$token = "6092505159:AAHo2CQPX2CNFLDlZ9KhN78Z-DZZUHbBXio";
$chat_id = "-1001860588471";

// Получаем данные из JSON
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Формируем сообщение для отправки в Telegram
$message = "<b>Новая заявка:</b>%0A";
$message .= "Название продукта: " . (!empty($data['product_name']) ? $data['product_name'] : "-") . "%0A";
$message .= "Имя клиента: " . (!empty($data['client_name']) ? $data['client_name'] : "-") . "%0A";
$message .= "Телефон клиента: " . (!empty($data['client_tel']) ? $data['client_tel'] : "-") . "%0A";
$message .= "E-mail клиента: " . (!empty($data['client_email']) ? $data['client_email'] : "-") . "%0A";
$message .= "Название компании: " . (!empty($data['company']) ? $data['company'] : "-") . "%0A";
$message .= "Количество сотрудников: " . (!empty($data['staff_number']) ? $data['staff_number'] : "-") . "%0A";
$message .= "Сообщение клиента: " . (!empty($data['client_message']) ? $data['client_message'] : "-") . "%0A";

// Проверяем наличие данных о комплектах (kits)
if (isset($data['kits']) && is_array($data['kits'])) {
    $kits = $data['kits'];

    foreach ($kits as $kit) {
        $client_grow = $kit['client_grow'];
        $client_size = $kit['client_size'];
        $kit_count = $kit['kit_count'];

        $message .= "Комплект:%0A";
        $message .= "Рост клиента: " . $client_grow . "%0A";
        $message .= "Размер клиента: " . $client_size . "%0A";
        $message .= "Количество: " . $kit_count . "%0A";
        $message .= "--------------%0A";
    }
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$message}", "r");

if ($sendToTelegram) {
    $response = [
        'message' => 'Заявка успешно отправлена!',
        'status' => 200
    ];
} else {
    $response = [
        'message' => 'Ошибка при отправке заявки',
        'status' => 500
    ];
}

header('Content-Type: application/json');
echo json_encode($response);