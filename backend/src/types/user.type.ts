type User = {
    id?: string,
    user_id :number,
    full_name: string,
    email:string,
    password_digest: string,  
    user_role: string,
    floor_number: number,
    desk_number: number,
    department :string
}
export default User