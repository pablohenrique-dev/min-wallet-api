interface ForgotPasswordEmailTemplateParams {
  username: string;
  resetLink: string;
}

export function forgotPasswordEmailTemplate({
  username,
  resetLink,
}: ForgotPasswordEmailTemplateParams) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #000000;">Redefinição de Senha</h2>
        <p>Olá ${username},</p>
        <p>Você solicitou a redefinição de sua senha. Clique no botão abaixo para redefinir sua senha:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #000000; color: white; padding: 10px 20px;text-decoration: none; font-size: 16px;">Redefinir Senha</a>
        <p><b>OBSERVAÇÃO:</b> O link para redefinição de senha só é válido por 1 hora. Caso o link tenha expirado, solicite uma nova redefinição de senha.</p>
        <p>Se você não solicitou esta alteração, por favor, ignore este email.</p>
        <p>Obrigado,</p>
        <p>
          <em>
            <b>MinWallet</b>
          </em>
        </p>
      </div>
    `;
}
