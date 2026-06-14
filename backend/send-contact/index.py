import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта Дианы на её email."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Fill all fields'}
        }

    to_email = os.environ.get('CONTACT_EMAIL', 'dianik19861946@gmail.com')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {name}'
    msg['From'] = 'noreply@poehali.dev'
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Новая заявка на выступление</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 120px;">Имя:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{email}</td>
            </tr>
            <tr>
                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Сообщение:</td>
                <td style="padding: 10px;">{message}</td>
            </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">Заявка отправлена с сайта Дианы</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP('smtp.poehali.dev', 587) as server:
        server.sendmail('noreply@poehali.dev', to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }