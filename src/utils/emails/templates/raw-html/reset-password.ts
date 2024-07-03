interface ResetPasswordEmailTemplateParams {
  username: string;
}

export function resetPasswordEmailTemplate({
  username,
}: ResetPasswordEmailTemplateParams) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #000000;">Redefinição de Senha</h2>
        <p>Olá ${username},</p>
        <p>Sua redefinição de senha foi concluída com sucesso!</p>
        <p>
          <em>
            <b>MinWallet</b>
          </em>
        </p>
      </div>
    `;
}
