export default function ({ set_value }: { set_value: ({ name, value }: { name: string; value: string }) => void }) {
    const items = {
        name: {
            label: "Enter your name",
            placeholder: "Name",
        },
    };

    return (
        <>
            {Object.entries(items).map(([item, val]) => {
                return (
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">{val.label}</span>
                        </div>
                        <input
                            type="text"
                            placeholder={val.placeholder}
                            onClick={(event) => {
                                set_value({ name: item.toLowerCase(), value: event.currentTarget.value });
                            }}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                );
            })}
        </>
    );
}
